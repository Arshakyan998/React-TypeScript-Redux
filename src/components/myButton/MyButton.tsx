import React, { ReactElement } from 'react'

interface Props {
        children:React.ReactChild |React.ReactNode
        onClick?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
        style?:any
}

function MyButton({children,...props }: Props): ReactElement {
        return (
                <button {...props}>
                        {children}
                        
                </button>
        )
}

export default MyButton
