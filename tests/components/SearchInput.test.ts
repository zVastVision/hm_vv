import { test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import SearchInput from "../../components/SearchInput.vue";


test("test value change", async () => {
    const wrapper = mount(SearchInput, {
        props: {
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })

    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
})

test("test icon show", async () => {
    const wrapper = mount(SearchInput, {
        props: {
            showSecondaryIcon: true,
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })

    expect(wrapper.find("#boxIcon").exists()).toBeTruthy()
})

test("test icon hide", async () => {
    const wrapper = mount(SearchInput, {
        props: {
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })

    expect(wrapper.find("#boxIcon").exists()).toBeFalsy()
})

