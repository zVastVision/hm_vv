import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import  DefaultCounter from "../../components/DefaultCounter.vue";

test('should increase counter', async() => {
    expect(DefaultCounter).toBeTruthy()

    const wrapper = mount(DefaultCounter, {
        props: { 
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })

    await wrapper.find("#btnIncrease").trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([2])
});

test('should decrease counter', async() => {
    expect(DefaultCounter).toBeTruthy()

    const wrapper = mount(DefaultCounter, {
        props: { 
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })
    await wrapper.find("#btnDecrease").trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([0])
});


test('should change via input field', async() => {
    expect(DefaultCounter).toBeTruthy()

    const wrapper = mount(DefaultCounter, {
        props: { 
            modelValue: 1,
            'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
        },
    })
    await wrapper.find("input").setValue(3)
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([3])
});