import UrlPattern from 'url-pattern'

export default {
  home: {
    slug: '/',
    title: 'Home',
    color: '#ff0055'
  },
  dishs: {
    slug: '/dishs/:id?',
    title: 'Dishs',
    color: '#0099ff',
    pattern: new UrlPattern('/dishs(/:id)')
  },
  victuals: {
    slug: '/victuals',
    title: 'Victuals',
    color: '#22cc88'
  },
  schedules: {
    slug: '/schedules/:id?',
    title: 'schedules',
    color: '#ffaa00'
  },
  'shopping-list': {
    slug: '/shopping-list',
    title: 'Shopping list',
    color: '#ff0055'
  }
}
