import { html } from './html'

export function loginPage() {
  return html({
    title: 'Login',
    body: `
    <h1>Login</h1>
    <form id="loginForm">
    <input type="text" name="email" placeholder="Email" value="angelhdz@gmail.com">
    <input type="password" name="password" placeholder="Email" value="123456">
    <button type="submit">Login</button>
    </form>
    <h1>Don't have an account?</h1>
    <button onClick="window.location.href = '/register'">Register</button>
    <script>
    const loginForm = document.querySelector('#loginForm')
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const formData = new FormData(loginForm)
      const email = formData.get('email')
      const password = formData.get('password')
      await window.apiClient.auth.login({
        email,
        password
      }, {
        credentials: 'include',
          mode: 'same-origin',
      })
      window.location.href = '/'
    })
    </script>
    `,
  })
}