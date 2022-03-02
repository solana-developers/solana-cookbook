<template>
<center class="code-info-title">Press 	&lt;&#47;&gt; button to view full source</center>

  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <div :class="{ 'hidden': preview }">
      <slot name="default" />
    </div>
    <div :class="{ 'hidden': !preview }">
      <slot name="preview" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SolanaCodeGroupItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    preview: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
  .block {
    display: block;
  }
</style>