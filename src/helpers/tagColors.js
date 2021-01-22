const slugify = (str) => str.replace(/\s+/g, '-').toLowerCase();

const tags = {
  beginners: {
    name: 'beginners',
    slug: slugify('beginners'),
    bg: 'bg-green-200 dark:bg-green-500',
    text: 'text-green-900 dark:text-white',
    hover: 'hover:bg-green-500 hover:text-white dark:hover:bg-green-400',
    mainColor: 'text-green-500',
    description: 'This tag shows posts aimed merely for beginners.'
  },
  openvpn: {
    name: 'openvpn',
    slug: slugify('openvpn'),
    bg: 'bg-openvpn-200 dark:bg-openvpn-500',
    text: 'text-openvpn-900 dark:text-white',
    mainColor: 'text-openvpn-500',
    hover: 'hover:bg-openvpn-500 hover:text-white dark:hover:bg-openvpn-400',
    description:
      'OpenVPN is open-source commercial software that implements virtual private network techniques to create secure point-to-point or site-to-site connections.'
  },
  'raspberry pi': {
    name: 'raspberry pi',
    slug: slugify('raspberry pi'),
    bg: 'bg-raspberrypi-200 dark:bg-raspberrypi-500',
    text: 'text-raspberrypi-800 dark:text-white',
    mainColor: 'text-raspberrypi-500',
    hover: 'hover:bg-raspberrypi-500 hover:text-white dark:hover:bg-raspberrypi-400',
    description: 'The Raspberry Pi is a small single-board computer.'
  },
  security: {
    name: 'security',
    slug: slugify('security'),
    bg: 'bg-gray-200 dark:bg-gray-500',
    text: 'text-gray-900 dark:text-white',
    mainColor: 'text-security-500',
    hover: 'hover:bg-gray-500 hover:text-white dark:hover:bg-gray-400',
    description:
      'This tag shows posts containing security related content like securing servers or ethical hacking. '
  },
  'code editor': {
    name: 'code editor',
    slug: slugify('code editor'),
    bg: 'bg-vscode-200 dark:bg-vscode-500',
    text: 'text-vscode-800 dark:text-white',
    mainColor: 'text-vscode-500',
    hover: 'hover:bg-vscode-500 hover:text-white dark:hover:bg-vscode-400',
    description:
      'This tag shows posts with tipps & tricks for code editors like Visual Studio Code.'
  },
  vps: {
    name: 'vps',
    slug: slugify('vps'),
    bg: 'bg-purple-200 dark:bg-purple-500',
    text: 'text-purple-800 dark:text-white',
    mainColor: 'text-purple-500',
    hover: 'hover:bg-purple-500 hover:text-white',
    description: 'This tag shows posts that are taking advantage of Virtual Private Servers.'
  },
  vpn: {
    name: 'vpn',
    slug: slugify('vpn'),
    bg: 'bg-indigo-200 ',
    text: 'text-indigo-800',
    mainColor: 'text-vpn-500',
    hover: 'hover:bg-indigo-500 hover:text-white',
    description:
      'A virtual private network (VPN) extends a private network across a public network and enables users to connect to computers as if they were in the same network. Today VPNs are also used to surf the internet more secure and anonymous using various VPN Providers.'
  },
  vultr: {
    name: 'vultr',
    slug: slugify('vultr'),
    bg: 'bg-vultr-200 ',
    text: 'text-vultr-800',
    mainColor: 'text-vultr-500',
    hover: 'hover:bg-vultr-500 hover:text-white',
    description:
      'This tag shows posts using Vultr VPS. Vultr is a great VPS provider with performant servers backed by benchmarks.'
  },
  ubuntu: {
    name: 'ubuntu',
    slug: slugify('ubuntu'),
    bg: 'bg-ubuntu-200',
    text: 'text-ubuntu-800',
    mainColor: 'text-ubuntu-500',
    hover: 'hover:bg-ubuntu-500 hover:text-white',
    description:
      'This tag shows posts that contain information about Ubuntu configuration. Ubuntu is a Linux distribution based on Debian.'
  },
  'hello world': {
    name: 'hello world',
    slug: slugify('hello world'),
    bg: 'bg-red-200',
    text: 'text-red-800',
    mainColor: 'text-red-500',
    hover: 'hover:bg-red-500 hover:text-white',
    description: 'Hello World. This is my first tag ever!'
  },
  2020: {
    name: '2020',
    slug: slugify('2020'),
    bg: 'bg-pink-200',
    text: 'text-pink-800',
    mainColor: 'text-pink-500',
    hover: 'hover:bg-pink-500 hover:text-white',
    description:
      'What a great year right? COVID-19 hit the world pretty hard and lots of other things happened, too many to list them all in this short description.'
  },
  server: {
    name: 'server',
    slug: slugify('server'),
    bg: 'bg-teal-200',
    text: 'text-teal-800',
    mainColor: 'text-teal-500',
    hover: 'hover:bg-teal-500 hover:text-white',
    description:
      'Posts that explain how to install, configure or interact with servers will show up here.'
  },
  javascript: {
    name: 'javascript',
    slug: slugify('javascript'),
    bg: 'bg-yellow-200',
    text: 'text-black',
    mainColor: 'text-yellow-200',
    hover: 'hover:bg-yellow-300 hover:text-black',
    description: 'Posts that are heavy Javascript focused will be listed here.'
  },
  terminal: {
    name: 'terminal',
    slug: slugify('terminal'),
    bg: 'bg-gray-900',
    text: 'text-white',
    mainColor: 'text-gray-900',
    hover: 'hover:bg-gray-900 hover:text-green-400',
    description: 'Posts that using CLI in the terminal.'
  },
  network: {
    name: 'network',
    slug: slugify('network'),
    bg: 'bg-gray-200',
    text: 'text-gray-800',
    mainColor: 'text-gray-500',
    hover: 'hover:bg-gray-500 hover:text-white',
    description: 'Posts that are heavy Javascript focused will be listed here.'
  },
  serverless: {
    name: 'serverless',
    slug: slugify('serverless'),
    bg: 'bg-serverless-200',
    text: 'text-serverless-800',
    mainColor: 'text-serverless-500',
    hover: 'hover:bg-serverless-500 hover:text-white',
    description:
      'Serverless or Lambda functions is a new way of programming. It removes the need of hosting and maintaining your own server, but instead you publish your code (functions) on services and pay per invocation.'
  },
  netlify: {
    name: 'netlify',
    slug: slugify('netlify'),
    bg: 'bg-netlify-100',
    text: 'text-netlify-600',
    mainColor: 'text-netlify-500',
    hover: 'hover:bg-netlify-500 hover:text-white',
    description: 'Netlify is a cloud service provider where you can host your static websites!'
  },
  'apple maps': {
    name: 'apple maps',
    slug: slugify('apple maps'),
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    mainColor: 'text-gray-900',
    hover: 'hover:bg-gray-500 hover:text-white',
    description: 'Apple Maps is a map software developed by Apple'
  },
  html: {
    name: 'html',
    slug: slugify('html'),
    bg: 'bg-html-200',
    text: 'text-html-800',
    mainColor: 'text-html-500',
    hover: 'hover:bg-html-500 hover:text-white',
    description:
      'Hypertext Markup Language is the standard markup language for documents designed to be displayed in a web browser.'
  },
  react: {
    name: 'react',
    slug: slugify('react'),
    bg: 'bg-react-gray-500',
    text: 'text-react-500',
    mainColor: 'text-react-500',
    hover: 'hover:bg-react-500 hover:text-react-gray-500',
    description: 'React is a JavaScript library for building user interfaces'
  },
  'next.js': {
    name: 'next.js',
    slug: slugify('next.js'),
    bg: 'bg-black',
    text: 'text-white',
    mainColor: 'text-black',
    hover: 'hover:bg-white hover:text-black',
    description: 'Next.js'
  },
  analytics: {
    name: 'analytics',
    slug: slugify('analytics'),
    bg: 'bg-green-200',
    text: 'text-green-900',
    hover: 'hover:bg-green-500 hover:text-white',
    mainColor: 'text-green-500',
    description: 'Analytics'
  },
  privacy: {
    name: 'privacy',
    slug: slugify('privacy'),
    bg: 'bg-blue-200',
    text: 'text-blue-900',
    hover: 'hover:bg-blue-500 hover:text-white',
    mainColor: 'text-blue-500',
    description: 'Privacy'
  },
  seo: {
    name: 'seo',
    slug: slugify('seo'),
    bg: 'bg-green-200',
    text: 'text-green-900',
    hover: 'hover:bg-green-500 hover:text-white',
    mainColor: 'text-green-500',
    description: 'SEO'
  },
  docker: {
    name: 'docker',
    slug: slugify('docker'),
    bg: 'bg-blue-200',
    text: 'text-blue-900',
    hover: 'hover:bg-blue-500 hover:text-white',
    mainColor: 'text-blue-500',
    description: 'Docker'
  }
};

export default tags;
