export function html(options) {
  const client = `window.apiClient = {

    user: {
            create(body, options = undefined) {
                return fetch('api/user', {
                method: 'POST',
    body: JSON.stringify(body),
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    findOne(id, options = undefined) {
                return fetch('\`\${id}\`', {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }
          },
    deposit: {
      findOne(id, options = undefined) {
        return fetch(\`api/deposit/user/\${id}\`, {
          method: 'GET',
          ...options,
          headers: {
            'Content-Type': 'application/json',
          }
        })
      },
            create(userId, body, options = undefined) {
                return fetch(\`api/deposit/user/\${userId}\`, {
                method: 'POST',
    body: JSON.stringify(body),
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    findAll(userId, options = undefined) {
                return fetch(\`api/deposit/all/user/\${userId}\`, {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    approve(id, options = undefined) {
                return fetch(\`api/deposit/approve/\${id}\`, {
                method: 'PATCH',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }
          },
    auth: {
            login(body,options = undefined) {
                return fetch('api/auth/login', {
                method: 'POST',
    body: JSON.stringify(body),
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    register(body,options = undefined) {
                return fetch('api/auth/register', {
                method: 'POST',
    body: JSON.stringify(body),
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    findProfile(options = undefined) {
                return fetch('/api/auth/profile', {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }
          },
    app: {
            index(options = undefined) {
                return fetch('/', {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    login(id, options = undefined) {
                return fetch('/login', {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            },
    register(id, options = undefined) {
                return fetch('/register', {
                method: 'GET',
                ...options,
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }
          },}
  `
  return `
  <!DOCTYPE html>
  <html>
  <head>
 
  <title>${options.title}</title>
  </head>
  <body>
  <script>
  ${client}
  </script>
  ${options.body}</body>
  </html>
 
  `
}