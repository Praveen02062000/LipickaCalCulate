const BackNodificationBtn = document.querySelector(".btn-exit");
const NodificationSliderBtn = document.querySelector(".nofication");
const SliderMainCon = document.querySelector(".slide-nodification-con");





BackNodificationBtn.addEventListener('click', () => {
    setTimeout(() => {
        SliderMainCon.style.display = "none";
    }, 1000)
    SliderMainCon.style.animation = "1s slider-return linear 1"
})


NodificationSliderBtn.addEventListener('dblclick', () => {
    setTimeout(() => {
        SliderMainCon.style.display = "flex";
    }, 0)
    SliderMainCon.style.animation = "1s slider linear 1"

})