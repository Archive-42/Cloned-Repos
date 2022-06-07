const urlParams = new URLSearchParams(window.location.search)
const isOctofiles = urlParams.has('octofiles')
if (isOctofiles) {
  const baseTemplate = () => {
    document.title = 'Upload Files ⬆️'
    return `
      <section>
        <svg width="100" height="100" class="octicon octicon-cloud-upload" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M7 9H5l3-3 3 3H9v5H7V9zm5-4c0-.44-.91-3-4.5-3C5.08 2 3 3.92 3 6 1.02 6 0 7.52 0 9c0 1.53 1 3 3 3h3v-1.3H3c-1.62 0-1.7-1.42-1.7-1.7 0-.17.05-1.7 1.7-1.7h1.3V6c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V12h2c2.08 0 4-1.16 4-3.5C16 6.06 14.08 5 12 5z"></path></svg>
        <h1>Drag & Drop Files</h1>
        <h5>File types supported: <strong>GIF, JPEG, JPG, PNG, DOCX, GZ, LOG, PDF, PPTX, TXT, XLSX or ZIP</strong>.</h3>
        <h5>The maximum size for files is <strong>25MB</strong> & the maximum size for images is <strong>10MB</strong>.</h3>
        ${uploadsTemplate()}
      </secton>
    `
  }

  const uploadsTemplate = () => {
    const list = _data.map(f => {
      const ext = f[2].toLowerCase().split('.').pop()
      const className = (types.indexOf(ext) >= 0) ? '' : 'bg-file'
      return `
        <a href="${f[2]}" target="_blank" rel="noopener">
          <span class="image ${className}" style="background-image:url(${f[2]}")><svg class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg></span>
          <span class="name">${f[1].split('/').pop()}.${ext}</span>
          <button class="remove-upload">x</button>
        </a>
      `
    }).join('')
    return `
      <div class="uploads">
        <div class="listing">
        <h3 class="full">Previous Uploads</h3>
          ${list}
          <div class="clear">
            <button class="btn toggle-uploads">See all uploads</button>
          </div>
        </div>
      </div>
    `
  }

  const uploadingTemplate = () => {
    document.title = 'Uploading Files 🔄'
    return `
      <section>
        <svg width="100" height="100" class="octicon octicon-sync" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M10.24 7.4a4.15 4.15 0 0 1-1.2 3.6 4.346 4.346 0 0 1-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 0 0 1.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 0 1 5.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 0 1 2.96 5z"></path></svg>
        <h1>Uploading...</h1>
      </section>
    `
  }

  const uploadedTemplate = (files) => {
    document.title = 'Upload Files ⬆️'
    const list = files.map(f => `
      <li>
        <svg width="18" height="18" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>&nbsp;
        <strong>${f[1]}</strong>&nbsp;
        (<a href="${f[2]}" target="_blank" rel="noopener">${f[2]}</a>)
      </li>
    `).join('')
    const text = files.map(f => f[2]).join('\n')
    const markdown = files.map(f => {
      const ext = f[2].toLowerCase().split('.').pop()
      const i = (types.indexOf(ext) >= 0) ? '!' : ''
      return `${i}[${f[1]}](${f[2]})`
    }).join('\n')
    return `
      <section>
        <svg width="100" height="100" class="octicon octicon-check" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
        <h1>Uploaded ${files.length} file${files.length === 1 ? '' : 's'}!</h1>
        <ul class="copy">${list}</ul>
        <textarea>${text}</textarea>
        <button class="btn copy">Copy as Plain Text</button>
        <textarea>${markdown}</textarea>
        <button class="btn copy">Copy as Markdown</button>
        ${uploadsTemplate()}
      </section>
    `
  }
  const errorTemplate = () => `
    <section>
    </section>
  `
  const prop = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
  const types = ['gif', 'jpeg', 'jpg', 'png']
  const store = (chrome && !!prop(['storage', 'local'], chrome)) ? chrome.storage.local : browser.storage.local
  const $field = document.querySelector('#issue_body')
  const $container = document.createElement('div')
  const $body = document.querySelector('body')
  var _data = []

  store.get(['files'], (data) => {
    _data = ( data && data.files) ? data.files : []
    $container.className = 'octofiles'
    $container.innerHTML = baseTemplate()
    $body.prepend($container)
    $field.placeholder = ''
    $field.value = ''
  })

  function copy (e) {
    if (e.target.classList.contains('copy')) {
      e.target.previousElementSibling.select()
      document.execCommand('copy')
      Array.from(document.querySelectorAll('.btn.copy')).map(e => e.classList.remove('btn-primary'))
      e.target.classList.add('btn-primary')
    }
  }

  function open (e) {
    if (e.target.classList.contains('toggle-uploads')) {
      const $uploads = document.querySelector('.octofiles .uploads')
      if ($uploads.classList.contains('open')) {
        $uploads.classList.remove('open')
        e.target.innerText = 'See all uploads'
      } else {
        $uploads.classList.add('open')
        e.target.innerText = 'Back to uploading'
      }
    }
  }

  function remove (e) {
    if (e.target.classList.contains('remove-upload')) {
      e.preventDefault();
      e.stopPropagation();
      const $link = e.target.parentNode
      const id = Array.from($link.parentNode.children).indexOf($link)
      _data.splice(id-1, id)
      store.set({ files: _data })
      $link.remove()
    }
  }

  function check() {
    let files = $field.value.match(/\[(.*?)\]\((.*?)\)/g)
    let images = $field.value.match(/<img.*?src=['"](.*?)['"]/g)
    if (!files && !images) {
      return
    }
    images = images ? images.map(i => ['Uploaded!', 'Image:', i.match(/<img.*?src=['"](.*?)['"]/)[1]]) : []
    files = files ? files.map(f => f.match(/\[(.*?)\]\((.*?)\)/)).concat(images) : images
    const isUploading = files.reduce((r, i) => r || i[0].includes('[Uploading'), false)
    if (isUploading) {
      $container.innerHTML = uploadingTemplate()
    } else {
      _data = files.concat(_data)
      store.set({ files: _data })
      $container.innerHTML = uploadedTemplate(files)
      $field.value = ''
    }
  }
  $field.addEventListener('change', check)
  $body.addEventListener('click', copy)
  $body.addEventListener('click', open)
  $body.addEventListener('click', remove)
}
