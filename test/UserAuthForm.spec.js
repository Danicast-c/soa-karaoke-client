// import { get, setupTest } from '@nuxt/test-utils'

// describe('ssr', () => {
//   setupTest({ server: true })

//   it('renders the index page', async () => {
//     const { body } = await get('/')

//     expect(body).toContain('<h1>Main View</h1>')
//   })
// })

import { mount } from '@nuxt/test-utils'
import UserAuthForm from '@/components/UserAuthForm.vue'

describe('UserAuthForm', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(UserAuthForm)
    expect(wrapper.vm).toBeTruthy()
  })
})


