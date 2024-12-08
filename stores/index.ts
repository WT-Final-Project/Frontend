import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookiee', () => {
    const userId = useCookie('userIdCookie', { maxAge: 60*60 } )
    const proyId = useCookie('proyIdCookie', {maxAge: 60*60} )
    const tareaId = useCookie('tareaIdCookie', {maxAge: 60*60} )

    const setUserId = (data?: string) => (userId.value = data)

    const setProyId = (data?: string) => (proyId.value = data)

    const setTareaId = (data?: string) => (tareaId.value = data)
  
    return { userId, proyId, tareaId, setUserId, setProyId, setTareaId}
})