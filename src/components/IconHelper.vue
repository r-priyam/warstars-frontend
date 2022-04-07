<script setup lang="ts">
import Iconify from '@purge-icons/generated';
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    iconStyle: {
        type: String,
        required: true
    }
});
const el = ref<HTMLElement | null>(null);
const update = async () => {
    await nextTick();
    if (el.value) {
        const svg = Iconify.renderSVG(props.icon, {});
        if (svg) {
            el.value.textContent = '';
            el.value.appendChild(svg); // @ts-expect-error To lazy to write types
            el.value.children[0].className.baseVal = `${el.value.children[0].className.baseVal} ${props.iconStyle}`;
        } else {
            const span = document.createElement('span');
            span.className = 'iconify';
            span.dataset.icon = props.icon;
            el.value.textContent = '';
            el.value.appendChild(span);
        }
    }
};
watch(() => props.icon, update, { flush: 'post' });
onMounted(update);
</script>

<template>
    <div ref="el" :class="$attrs.class" />
</template>

<style>
span.iconify {
    background: #5551;
    border-radius: 100%;
    min-width: 1em;
    min-height: 1em;
    display: block;
}
</style>
