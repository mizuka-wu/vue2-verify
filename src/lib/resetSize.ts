/**
 * @todo 修改
 * @param vm
 */
export default function resetSize(vm) {
  var img_width, img_height, bar_width, bar_height; //图片的宽度、高度，移动条的宽度、高度

  var parentWidth = vm.$el.parentNode.offsetWidth;
  var parentHeight = vm.$el.parentNode.offsetHeight;

  if (vm.imgSize.width.indexOf("%") != -1) {
    img_width = (parseInt(this.imgSize.width) / 100) * parentWidth + "px";
  } else {
    img_width = this.imgSize.width;
  }

  if (vm.imgSize.height.indexOf("%") != -1) {
    img_height = (parseInt(this.imgSize.height) / 100) * parentHeight + "px";
  } else {
    img_height = this.imgSize.height;
  }

  if (vm.barSize.width.indexOf("%") != -1) {
    bar_width = (parseInt(this.barSize.width) / 100) * parentWidth + "px";
  } else {
    bar_width = this.barSize.width;
  }

  if (vm.barSize.height.indexOf("%") != -1) {
    bar_height = (parseInt(this.barSize.height) / 100) * parentHeight + "px";
  } else {
    bar_height = this.barSize.height;
  }

  return {
    imgWidth: img_width,
    imgHeight: img_height,
    barWidth: bar_width,
    barHeight: bar_height
  };
}
