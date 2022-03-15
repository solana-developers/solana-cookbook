<script>
import { defineComponent, h, onBeforeUpdate, ref } from 'vue'

export default defineComponent({
  name: 'SolanaCodeGroup',

  setup(_, { slots }) {
    // index of current active item
    const activeIndex = ref(-1)

    // refs of the tab buttons
    const tabRefs = ref([])

    if (__VUEPRESS_DEV__) {
      // after removing a code-group-item, we need to clear the ref
      // of the removed item to avoid issues caused by HMR
      onBeforeUpdate(() => {
        tabRefs.value = []
      })
    }

    // activate next tab
    const activateNext = (i = activeIndex.value) => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1
      } else {
        activeIndex.value = 0
      }
      tabRefs.value[activeIndex.value].focus()
    }

    // activate previous tab
    const activatePrev = (i = activeIndex.value) => {
      if (i > 0) {
        activeIndex.value = i - 1
      } else {
        activeIndex.value = tabRefs.value.length - 1
      }
      tabRefs.value[activeIndex.value].focus()
    }

    // handle keyboard event
    const keyboardHandler = (event, i) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        activeIndex.value = i
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        activateNext(i)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        activatePrev(i)
      }
    }

    // check if we have preview slots before setting our initial value
    const items = (slots.default?.() || [])
    let hasPreviewSlot = false
    items.forEach((i) => {
      if (Object.keys(i.children).includes('preview')) {
        hasPreviewSlot = true
      }
    })
    const preview = ref(hasPreviewSlot)

    const togglePreview = () => {
      preview.value = !preview.value
    }

    // Adapted from https://v3.vuejs.org/guide/render-function.html#complete-example
    function getChildrenTextContent(children) {
      return children
        .map(node => {
          // Ignore line numbers
          if (node.props?.class === 'line-number') return ''

          return typeof node.children === 'string'
            ? node.children
            : Array.isArray(node.children)
            ? getChildrenTextContent(node.children)
            : ''
        })
        .join('')
    }

    const copyActiveToClipboard = () => {
      let activeItem = items.find((vnode, i) => i === activeIndex.value)
      let children = preview.value ? activeItem.children['preview']() : activeItem.children['default']()
      let code = getChildrenTextContent(children)
      let data = [new ClipboardItem({ "text/plain": new Blob([code], { type: "text/plain" }) })]
      navigator.clipboard.write(data)
    }

    return () => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won't be changed once the
      // `setup()` function of current component is called

      // get children code-group-item
      const items = (slots.default?.() || [])
        .map((vnode) => {
          if (vnode.props === null) {
            vnode.props = {
              preview: preview
            }
          }
          return vnode
        })

      // do not render anything if there is no code-group-item
      if (items.length === 0) {
        return null
      }

      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        // if `activeIndex` is invalid

        // find the index of the code-group-item with `active` props
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props.active === '' || vnode.props.active === true
        )

        // if there is no `active` props on code-group-item, set the first item active
        if (activeIndex.value === -1) {
          activeIndex.value = 0
        }
      } else {
        // set the active item
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value
          vnode.props.preview = preview.value
        })
      }

      return h('div', { class: 'code-group' }, [
        h(
          'div',
          { class: 'code-group__nav' },
          h(
            'ul',
            { class: 'code-group__ul' },
            items.map((vnode, i) => {
              const isActive = i === activeIndex.value

              return h(
                'li',
                { class: 'code-group__li' },
                h(
                  'button',
                  {
                    ref: (element) => {
                      if (element) {
                        tabRefs.value[i] = element
                      }
                    },
                    class: {
                      'code-group__nav-tab': true,
                      'code-group__nav-tab-active': isActive,
                    },
                    ariaPressed: isActive,
                    ariaExpanded: isActive,
                    onClick: () => (activeIndex.value = i),
                    onKeydown: (e) => keyboardHandler(e, i),
                  },
                  vnode.props.title
                )
              )
            }),
            h('li', { class: 'flex-grow' }),
            h(
              'li',
              { class: 'code-group__li' },
              h(
                'button',
                {
                  class: {
                    'code-group__nav-tab': true,
                  },
                  onClick: () => togglePreview(),
                },
                h(
                  'svg', {
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none'
                  },
                  h('path', {
                    stroke: 'currentColor',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                  })
                )
              )
            ),
            h(
              'li',
              { class: 'code-group__li' },
              h(
                'button',
                {
                  class: {
                    'code-group__nav-tab': true,
                  },
                  onClick: () => copyActiveToClipboard(),
                },
                h(
                  'svg', {
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none'
                  },
                  h('path', {
                    stroke: 'currentColor',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  })
                )
              )
            ),
          )
        ),
        h('div', [preview.value ?   h(
          'div',
          { class: 'code-info-title' },
          "Press </> button to view full source"
        ) :  null]),
        items,
      ])
    }
  },
})
</script>