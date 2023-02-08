<script setup lang="ts">
import { onMounted } from 'vue';

const data = [
  {
    fill: 15,
    color: '#80e080',
  },
  {
    fill: 35,
    color: '#4fc3f7',
  },
  {
    fill: 20,
    color: '#9575cd',
  },
  {
    fill: 30,
    color: '#f06292',
  },
];

onMounted(() => {
  const doughnut = document.querySelector('#doughnut');
  const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  let filled = 0;
  $svg.setAttribute('width', '100%');
  $svg.setAttribute('height', '100%');
  $svg.setAttribute('viewBox', '0 0 100 100');
  doughnut?.appendChild($svg);

  data.forEach(function (o, i) {
    const $circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      startAngle = -90,
      radius = 30,
      cx = 50,
      cy = 50,
      animationDuration = 2000,
      strokeWidth = 15,
      dashArray = 2 * Math.PI * radius,
      dashOffset = dashArray - (dashArray * o.fill) / 100,
      angle = (filled * 360) / 100 + startAngle,
      currentDuration = (animationDuration * o.fill) / 100,
      delay = (animationDuration * filled) / 100;
    $circle.setAttribute('r', String(radius));
    $circle.setAttribute('cx', String(cx));
    $circle.setAttribute('cy', String(cy));
    $circle.setAttribute('fill', 'transparent');
    $circle.setAttribute('stroke', o.color);
    $circle.setAttribute('stroke-width', String(strokeWidth));
    $circle.setAttribute('stroke-dasharray', String(dashArray));
    $circle.setAttribute('stroke-dashoffset', String(dashArray));
    $circle.style.transition = 'stroke-dashoffset ' + currentDuration + 'ms linear ' + delay + 'ms';
    $circle.setAttribute('transform', 'rotate(' + angle + ' ' + cx + ' ' + cy + ')');

    $svg.appendChild($circle);

    filled += o.fill;
    setTimeout(function () {
      $circle.style['stroke-dashoffset' as any] = String(dashOffset);
    }, 100);
  });
});
</script>
<template>
  <div id="doughnut"></div>
</template>
<style>
circle:hover {
  transform: rotate(-90deg) scale(1.1);
  /* transform: scale(1.1); */
}
</style>
