import { useState, createContext } from "react";
import axios from 'axios'

const LetrasContext = createContext()

const LetrasProvider = ({children}) => {

    const [alerta, setAlerta] = useState('')
    const [letra, setLetra] = useState('')
    const [cargando, setcargando] = useState(false)

    const busquedaLetra = async (busqueda) => {
        setcargando(true)
        try {
            
            const {artista, cancion} = busqueda
            const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
            const {data} = await axios(url)
            setLetra(data.lyrics)
            setAlerta('')
        } catch (error) {
            setAlerta('Cancion no encontrada')
        }
        setcargando(false)
    } 

    return(
        <LetrasContext.Provider
            value={{alerta,setAlerta,busquedaLetra,letra, cargando}}
            >
                {children}
            </LetrasContext.Provider>
    )

}

export {
    LetrasProvider
}

export default LetrasContext