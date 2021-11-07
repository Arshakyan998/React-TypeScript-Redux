import { largesImgTypes, largeTypes,iImages } from './../reduxTypes/Types';


export const showLargeImg=(val:boolean):largesImgTypes=>({
type:largeTypes.LARGE_IMG,
payload:val
}) 

export const largeImgDate=(val:iImages[]):largesImgTypes=>({
        type:largeTypes.LARGE_IMG_DATE,
        payload:val
})