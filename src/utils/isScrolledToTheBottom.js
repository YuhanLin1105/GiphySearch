export const isScrolledToTheBottom = (e,closeTo)=>{
    return   Math.floor(e.target.scrollHeight - e.target.scrollTop) - closeTo <= e.target.clientHeight
}