import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('mobile navigation', () => {
  it('exposes its expanded state and closes after selecting a section', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    const toggle = wrapper.get('button[aria-controls="navbarItems"]')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')

    await wrapper.get('#navbarItems a[href="#resume"]').trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement?.id).toBe('resume')
    wrapper.unmount()
  })

  it('closes on Escape and returns focus to the menu button', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    const toggle = wrapper.get('button[aria-controls="navbarItems"]')
    await toggle.trigger('click')
    const link = wrapper.get<HTMLAnchorElement>('#navbarItems a[href="#contact"]')
    link.element.focus()
    await link.trigger('keydown', { key: 'Escape' })

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle.element)
    wrapper.unmount()
  })

  it('closes on Escape when the browser has moved focus outside navigation', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    const toggle = wrapper.get('button[aria-controls="navbarItems"]')
    await toggle.trigger('click')
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle.element)
    wrapper.unmount()
  })
})
