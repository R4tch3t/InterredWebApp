export const printBackgroundSVG = () => {
    let bodySVG = "<svg id='bodySVG' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='0 0 100 100' width='100%' height='100%' style=' position: relative; top: 0px; left: 0px;' > </svg>";
    let divSVG = "<div id='divSVG' style='opacity: 0; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;' > "+bodySVG+" </div>";
    return divSVG
}