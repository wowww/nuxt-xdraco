<template>
  <div class="contact-us">
    <a href="https://cs.mir4global.com/customer?category=191" class="link-contact-us" target="_blank">Customer Service</a>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SidebarContactUs',
});
</script>

<style lang="scss" scoped>
.contact-us {
  margin: 24px 0;

  .link-contact-us {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border: 1px solid rgba(#fff, 0.15);
    background-color: rgba(2, 2, 25, 0.25);
    height: 64px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;

    &::before {
      content: '';
      display: block;
      width: 24px;
      height: 25px;
      background: url('https://file.mir4global.com/xdraco/img/common/ico-contact-us.svg') 0 0 / cover no-repeat;
    }
  }
}
</style>
