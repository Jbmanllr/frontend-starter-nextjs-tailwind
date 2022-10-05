import { faker } from '@faker-js/faker'
//import { date } from 'faker'

export type Post = {
  title: string
  category: string
  subtitle: string
  text: string
  author: string
  picture: string
  pictureBlur: string
  pictureMainColor: number[]
  dataUri: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPost = (): Post => {
  return {
    title: faker.name.firstName(),
    category: faker.commerce.department(),
    subtitle: faker.commerce.department(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    author: 'Author',
    picture: faker.image.abstract(300, 300, true),
    pictureBlur: faker.image.abstract(3, 3, true),
    pictureMainColor: faker.color.hsl({ format: 'decimal' }),
    dataUri: faker.image.dataUri()
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Post[] => {
    const len = lens[depth]!
    return range(len).map((d): Post => {
      return {
        ...newPost(),
      }
    })
  }

  return makeDataLevel()
}

const data = makeData(10000)

export async function fetchData(options: {
  pageIndex: number
  pageSize: number
}) {
  // Simulate some network latency
  await new Promise(r => setTimeout(r, 500))

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    pageSize: options.pageSize,
    page: options.pageIndex.toString(),
    total: data.length
  }
}
