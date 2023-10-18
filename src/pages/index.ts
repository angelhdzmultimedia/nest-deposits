import { html } from './html'

export function indexPage() {
  return html({
    title: 'Home',
    body: `
    <div id="welcome">Welcome, guest!</div>
    <h1>Create Deposit</h1>
    <form id="depositForm">
    <input placeholder="Amount" name="amount">
    <input placeholder="Details" name="details">

    <button type="submit">Create</button>
    </form>
    <script>
    let user = {}
    async function loadProfile() {
      try {
        const res = await window.apiClient.auth.findProfile({
          credentials: 'include',
          mode: 'same-origin',
        })

        if (res.status === 401) {
          window.location.href = '/login'
          return
        }
        user = await res.json()
        const depositRes = await window.apiClient.deposit.findAll(user.id, {
          credentials: 'include',
          mode: 'same-origin',
        })
        user.deposits = (await depositRes.json()) ?? []
        document.querySelector('#welcome').innerHTML = \`
        Welcome, \${user.name}!
        \${user.roles.includes('admin') ? \`
          <button onClick="window.location.href = '/admin'">Admin Panel</button>
        
        \` : ''}
        ID: \${user.id}
        Balance: \${user.balance}
        Deposits: 
        <div style="display: flex; flex-direction: column;">
          \${user.deposits.map(item => {
            return \`
            <span>Amount: \${item.amount}</span>
            <span>ID: \${item.id}</span>
            <span>Status: \${
              item.status === 'pending'
              ? '<span style="color: red;">Pending</span>'
              : '<span style="color: green;">Approved</span>'
            }</span>
            \`
          })}
        </div>
        \`
      } catch (error) {
       
        window.location.href = '/login'
      }
    }
    const depositForm = document.querySelector('#depositForm')
    depositForm.addEventListener('submit', async (event) => {
      const formData = new FormData(depositForm)
      const amount = +formData.get('amount')
      const details = formData.get('details')
      await window.apiClient.deposit.create(user.id, {
        amount, 
        details,
      }, {
        credentials: 'include',
          mode: 'same-origin',
      })
      loadProfile()
    })
    window.addEventListener('load', async () => {
     await loadProfile()
    })
     
    </script>
    `,
  })
}