import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMount } from 'ahooks';
import { useDispatch, useLocation, useSelector } from 'umi';

import { flatten } from '@cf2e/utils';

import { StaffRoles } from '@/types/staff';
import { guideConfigs } from '@/utils/constant';

import { VerifyPermission } from '../../config/routes';

export function useModalVisible(
    initialVisible: boolean = false,
): [boolean, () => void, () => void, (visible: boolean) => void, () => void] {
    const [visible, updateVisible] = useState(initialVisible);

    function showModal() {
        updateVisible(true);
    }
    function hideModal() {
        updateVisible(false);
    }
    function toggle() {
        if (visible === true) {
            hideModal();
        }
        if (visible === false) {
            showModal();
        }
    }

    return [visible, showModal, hideModal, updateVisible, toggle];
}

export function useTagGroups() {
    const dispatch = useDispatch();
    const { groups } = useSelector((state: GlobalStore) => state.tag);
    useMount(() => {
        dispatch({ type: 'tag/fetchTagGroups' });
    });

    const memoedGroups = useMemo(() => {
        return groups;
    }, [groups]);

    return memoedGroups;
}

/**
 * 支持写 async 函数的 useEffect
 * @param fn
 * @param deps
 */
export function useAsyncEffect(
    fn: () => (() => void) | void | Promise<void>,
    deps: React.DependencyList,
) {
    useEffect(() => {
        const callbackPromise = (async () => {
            const cbOrUndefined = await fn();
            return cbOrUndefined;
        })();
        return () => {
            callbackPromise.then((cbOrUndefined) => {
                if (typeof cbOrUndefined === 'function') {
                    cbOrUndefined();
                }
            });
        };
    }, deps);
}
function getLoading(effects, types) {
    if (Array.isArray(types)) {
        return types
            .map((type) => {
                return effects[type];
            })
            .some(Boolean);
    }
    return !!effects[types as string];
}
/**
 * 更方便获取 loading 的组件
 * @param types
 */
export function useLoading(types: string | string[]) {
    const effects = useSelector(
        (state: GlobalStore) => state.loading.effects,
        (prevEffects, nextEffects) => {
            const prevLoading = getLoading(prevEffects, types);
            const nextLoading = getLoading(nextEffects, types);
            if (prevLoading !== nextLoading) {
                return false;
            }
            return true;
        },
    );
    return getLoading(effects, types);
}

export function useCountdown(
    fn?: () => void,
): [number | null, { start: (value?: number) => void; clear: () => void }] {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        // console.log('[HOOKS]useCountdown', countdown);
        if (countdown !== null && running === true) {
            const t = setTimeout(() => {
                if (fn) {
                    fn();
                }
                if (countdown !== null && running === true) {
                    setCountdown(countdown - 1);
                }
            }, 1000);
            setTimer(t);
            if (countdown === 0) {
                setCountdown(null);
                clearTimeout(t);
            }
            return () => clearTimeout(t);
        }
        if (countdown === null && timer !== null && running === false) {
            clearTimeout(timer);
        }
        return () => {};
    }, [countdown, running]);

    return [
        countdown,
        {
            start(value) {
                setCountdown(value || 100);
                setRunning(true);
            },
            clear() {
                setCountdown(null);
                setRunning(false);
                window.clearTimeout(timer);
            },
        },
    ];
}

/**
 * 是否SCRM页面
 */
export function useInScrmPages() {
    const { pathname } = useLocation();
    const { user, menus } = useSelector((store: GlobalStore) => store.global);

    return useMemo(() => {
        const scrmRoutes = menus.find((menu) => menu.key === 'scrm')?.children || [];
        if (scrmRoutes) {
            const scrmRoutesPath = flatten(scrmRoutes).map((route) => route.path);
            const isScrmPage = scrmRoutesPath.includes(pathname);
            if (isScrmPage) {
                return true;
            }
        }
        return false;
    }, [pathname, user, menus]);
}
/**
 * 当前角色是否有权限查看该页面
 */
export function useHasPagePermission() {
    const { highlightMenu, menuKeys } = useSelector((store: GlobalStore) => store.global);
    const { currentKey, authority } = highlightMenu;

    return useMemo(() => {
        if (!currentKey || authority === VerifyPermission.No) {
            // 没有key的默认有权限进入
            return true;
        }
        return menuKeys.includes(currentKey);
    }, [highlightMenu, menuKeys]);
}
/**
 * 是否有某个模块权限 SCRM、ERP 这种
 */
export function useHasModulePermission() {
    const { pathname } = useLocation();
    const isScrmPage = useInScrmPages();
    const user = useSelector((store: GlobalStore) => store.global.user);

    const [hasPermission, setHasPermission] = useState(true);

    useMemo(() => {
        if (isScrmPage) {
            if (user && user.hasScrmPermission === false) {
                setHasPermission(false);
                return;
            }
        }
        setHasPermission(true);
    }, [pathname, user]);

    return hasPermission;
}

/**
 * 获取有权限的三级入口
 * @param allThirdEntry
 */
export function usePermissionThirdEntry(allThirdEntry: { key: string; [key: string]: any }[]) {
    const menuKeys = useSelector((store: GlobalStore) => store.global.menuKeys);
    // 需要被权限控制的key集合
    const permissionThirdEntry = useMemo(() => {
        return allThirdEntry.filter((item) => menuKeys.includes(item.key));
    }, [menuKeys, allThirdEntry]);

    return permissionThirdEntry;
}

/**
 * 是否有某个功能权限
 * @param featureKey
 */
export function useHasFeaturePermission(featureKey: string) {
    const menuKeys = useSelector((store: GlobalStore) => store.global.menuKeys);

    const hasPermission = useMemo(() => {
        return menuKeys.includes(featureKey);
    }, [menuKeys, featureKey]);

    return hasPermission;
}

export function useGuideVisible(guideKey: string): [boolean, Function] {
    const dispatch = useDispatch();
    const allGuide = useSelector((store: GlobalStore) => store.global.newUserGuide);

    const isShow = useMemo(() => {
        return allGuide.includes(guideKey);
    }, [allGuide, guideKey]);

    const hide = useCallback(() => {
        dispatch({
            type: 'global/updateGuideStatus',
            payload: guideKey,
        });
    }, [guideKey]);

    return [isShow, hide];
}

function hasHooksFunctionComponent(fiber) {
    const { memoizedState } = fiber;
    // { baseQueue: any; baseState: any; next: IHook } 就是 hook 啊
    if (
        memoizedState.baseState !== undefined &&
        memoizedState.baseQueue !== undefined &&
        memoizedState.next !== undefined
    ) {
        return true;
    }
    return false;
}

function logFactory({
    namespace,
    prefix,
    text,
    debug,
}: {
    namespace: string;
    prefix: string;
    text?: string;
    debug?: boolean;
}) {
    if (debug === true) {
        return (...args: any[]) => {
            console.log(
                `%c ${namespace} %c ${prefix} %c ${text || ''} `,
                'color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;',
                'color:white;background:#ff9900;border-top-right-radius:2px;border-bottom-right-radius:2px;',
                'color:#ff9900;',
                ...args,
            );
        };
    }
    return () => {};
}
export function useMeasure() {
    // @ts-ignore
    const renderer = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.get(1);
    const currentFiber = renderer.getCurrentFiber();
    const ref = useRef({ memoizedState: null });
    const { type, memoizedState } = currentFiber;
    // console.log("[- measure -]", type.name);
    // console.log(currentFiber);

    if (currentFiber.pendingProps && currentFiber.memoizedProps) {
        const { pendingProps, memoizedProps } = currentFiber;
        const pendingPropKeys = Object.keys(pendingProps);
        const memoizedPropKeys = Object.keys(memoizedProps);
        const family = {
            pendingProps: pendingPropKeys
                .map((key) => ({ [key]: pendingProps[key] }))
                .reduce((total, prev) => ({ ...total, ...prev }), {}),
            memoizedProps: memoizedPropKeys
                .map((key) => ({ [key]: memoizedProps[key] }))
                .reduce((total, prev) => ({ ...total, ...prev }), {}),
            isEqual: pendingPropKeys
                .map((key) => ({
                    [key]: pendingProps[key] === memoizedProps[key],
                }))
                .reduce((total, prev) => ({ ...total, ...prev }), {}),
        };
        console.table(family);
    }
    if (hasHooksFunctionComponent(currentFiber)) {
        ref.current.memoizedState = memoizedState;
    }
}

// 小商店授权流程中绑定逻辑
export function useBindMinishop() {
    const dispatch = useDispatch();
    function bindMinishop() {
        // 如果存在verification，说明正处于小商店授权流程，需发起小商店绑定请求
        const verification = localStorage.getItem('MinishopVerification');
        if (verification) {
            const { appId, serviceId } = JSON.parse(verification);
            dispatch({
                type: 'global/authMinishop',
                payload: { appId, serviceId },
            });
            localStorage.removeItem('MinishopVerification');
        }
    }
    return bindMinishop;
}

export function useGoToDefaultPage() {
    const { user } = useSelector((store: GlobalStore) => store.global);
    const { groupId } = user || {};

    // 登录、注册成功后还未调用getUserInfo前需传入权限组id
    function gotoDefaultPage(id?: number) {
        const currentGroup = id || groupId;
        // 根据不同角色进入不同默认页面
        switch (currentGroup) {
            case StaffRoles.Super:
            case StaffRoles.Admin:
            case StaffRoles.OperationSpecialist:
                window.location.replace('/wxwork');
                break;
            case StaffRoles.ShoppingGuide:
                window.location.replace('/wxwork/customer');
                break;
            case StaffRoles.DeliverySpecialist:
                window.location.replace('/wxwork/order');
                break;
            default:
                window.location.replace('/wxwork');
                break;
        }
    }

    return gotoDefaultPage;
}

export function useGuideConfig() {
    const highlightMenu = useSelector((store: GlobalStore) => store.global.highlightMenu);
    const { currentKey } = highlightMenu;

    const guideConfig = useMemo(() => {
        return guideConfigs[currentKey];
    }, [currentKey]);

    return guideConfig || null;
}
