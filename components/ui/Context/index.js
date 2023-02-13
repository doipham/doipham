import { useReducer, useMemo, createContext, useContext } from "react"
import { getInfo, setInfo, getSignKey, saveSignKey, saveExpireSignKey } from "lib/Cookies"
import { apiSubscription } from "api"
import KEY from "./Const"

const dfUserInfo = {}
const dfToast = {
  display: false,
  type: "success",
  title: "Thông báo !",
  message: "",
  duration: 3000
}

function initialState() {
  return {
    userInfo: getInfo() || dfUserInfo,
    toast: dfToast,
    isShowModalLogin: false,
    signKey: getSignKey(),
    modalLive: {
      show: false,
      info: {}
    }
  }
}

function reducer(state, action) {
  // debugger
  switch (action.type) {
    case KEY.SET_USER:
      return { ...state, userInfo: action.value ? action.value : dfUserInfo }
    case KEY.SHOW_TOAST:
      return { ...state, toast: { ...dfToast, ...action.value, display: true } }
    case KEY.CLOSE_TOAST:
      return { ...state, toast: dfToast }
    case KEY.MODAL_LOGIN:
      return { ...state, isShowModalLogin: !state.isShowModalLogin }
    case KEY.MODAL_LIVE:
      return { ...state, modalLive: action.value }
    case KEY.SIGN_KEY:
      return { ...state, signKey: action.value }
    case KEY.LOG_OUT:
      return initialState()
    default:
      throw new Error()
  }
}

const MyContext = createContext(initialState())
MyContext.displayName = "MyContext"

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const setUser = (value) => {
    setInfo(value)
    return dispatch({ type: KEY.SET_USER, value })
  }
  const showToast = (value) => dispatch({ type: KEY.SHOW_TOAST, value })
  const closeToast = () => dispatch({ type: KEY.CLOSE_TOAST })
  const togleModalLogin = () => dispatch({ type: KEY.MODAL_LOGIN })
  const setModalLive = (value) => dispatch({ type: KEY.MODAL_LIVE, value })
  const logOut = () => dispatch({ type: KEY.LOG_OUT })
  const setSignKey = async (dataBody) => {
    let signKey = ""
    try {
      const { data } = await apiSubscription.getKey(dataBody)
      signKey = data?.sign_key
      saveSignKey(signKey)
      saveExpireSignKey(data?.exp)
      dispatch({ type: KEY.SIGN_KEY, value: signKey })
    } catch (e) {
      // console.log(e.response?.status === 402)
    }
  }

  const value = useMemo(
    () => ({
      ...state,
      setUser,
      showToast,
      closeToast,
      togleModalLogin,
      setModalLive,
      setSignKey,
      logOut
    }),
    [state]
  )
  return <MyContext.Provider value={value} {...props} />
}

const useStore = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useStore
