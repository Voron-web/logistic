document.addEventListener('DOMContentLoaded', () => {
   //===============================================================================

   //title font size

   const container = document.querySelector('.container');
   const titlePage = document.querySelector('h1');
   let fontSize = 100;
   titlePage.style.fontSize = fontSize + 'px';


   function changeFontSize() {
      let containerPadding = Number(window.getComputedStyle(container).paddingLeft.replace('px', '')) + Number(window.getComputedStyle(container).paddingLeft.replace('px', ''));

      if (titlePage.clientWidth < container.clientWidth - containerPadding - 1) {
         while (titlePage.clientWidth < (container.clientWidth - 1 - containerPadding)) {
            if (titlePage.clientWidth < (container.clientWidth - containerPadding - 200)) {
               fontSize += 10;
            } else {
               fontSize++;
            }
            titlePage.style.fontSize = fontSize + 'px';
            if (fontSize > 500) {
               titlePage.style.fontSize = 50 + 'px';
               break;
            }
         }
      }
      else if (titlePage.clientWidth > container.clientWidth - containerPadding - 1) {
         while (titlePage.clientWidth > (container.clientWidth - 1 - containerPadding)) {
            if (titlePage.clientWidth > (container.clientWidth - containerPadding + 200)) {
               fontSize -= 10;
            } else {
               fontSize--;
            }
            titlePage.style.fontSize = fontSize + 'px';
            if (fontSize < 20) {
               titlePage.style.fontSize = 20 + 'px';
               break;
            }
         }
      }
   }

   changeFontSize();
   window.addEventListener('resize', changeFontSize);
})