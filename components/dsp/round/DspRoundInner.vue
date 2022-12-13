<script>
export default {
  name: 'DspRoundInner',
  functional: true,
  props: ['tag'],
  render(createElement, context) {
    const { children, props, data } = context;

    return props.tag ? createElement(props.tag, data, children) : children;
  },
};
</script>
