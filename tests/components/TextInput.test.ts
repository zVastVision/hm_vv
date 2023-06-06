import { test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import TextInput from "../../components/TextInput.vue";


test("test value change",async () => {
        const wrapper = mount(TextInput, {
        props: {
            name: "name",
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })

    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
})