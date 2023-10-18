import { html } from './html'

export function registerPage() {
  return html({
    title: 'Register',
    body: `
    <h1>Register</h1>
    <form id="registerForm">
    <input type="text" name="email" placeholder="Email" value="angelhdz@gmail.com">
    <input type="text" name="name" placeholder="Name" value="Ángel">
    <input type="password" name="password" placeholder="Email" value="123456">
    <button type="submit">Register</button>
    </form>
    <h1>Already registered?</h1>
    <button onClick="window.location.href = '/login'">Login</button>
    <script>
    const registerForm = document.querySelector('#registerForm')
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const formData = new FormData(registerForm)
      const email = formData.get('email')
      const password = formData.get('password')
      const name = formData.get('name')
      await window.apiClient.auth.register({
        email,
        password,
        name,
      }, {
          mode: 'same-origin',
      })
      window.location.href = '/login'
    })
    </script>
    `
  })
}