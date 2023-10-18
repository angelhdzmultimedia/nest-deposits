import { html } from './html'

export function adminPanelPage() {
  return html({
    title: 'Admin Panel',
    body: `
    <span id="profile"></span>
    <h1>Find Deposit</h1>
    <input id="depositId" name="deposit-id" placeholder="Deposit ID">
    <button onClick="findDeposit()">Find</button>
    <div id="deposit">
    No results.
    </div>
    <script>
    let deposit = {}
    let user = {}
    window.addEventListener('load', async () => {
      await loadProfile()
     })
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

        document.querySelector('#profile')
          .innerHTML = \`
          ID: \${user.id}
          Name: \${user.name}
          Roles: \${user.roles}
          
          \`
        
      } catch (error) {
       
        window.location.href = '/login'
      }
    }

  
    async function findDeposit() {
      const depositId = document.querySelector('#depositId').value

      const depositRes = await window.apiClient.deposit.findOne(depositId, {
        mode: 'same-origin',
      })
      deposit = await depositRes.json()
      document.querySelector('#deposit')
        .innerHTML = \`
        <span>\${JSON.stringify(deposit)}</span>
        <button onClick="approveDeposit('\${deposit.id}')">Approve</button>
        \`
    }

    async function approveDeposit(depositId) {
      try {
        const depositRes = await window.apiClient.deposit.approve(depositId, {
          credentials: 'include',
          mode: 'same-origin',
        })
        alert(\`Deposit \${depositId} approved.\`)
        deposit = await depositRes.json()
        document.querySelector('#deposit')
        .innerHTML = \`
        <span>\${JSON.stringify(deposit)}</span>
        <button onClick="approveDeposit('\${deposit.id}')">Approve</button>
        \`
      } catch (error) {
        alert(error)
      }
    }

    </script>
    `
  })
}