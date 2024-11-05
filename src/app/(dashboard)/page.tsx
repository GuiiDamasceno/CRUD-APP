import { AddUserButton } from '@/components/add-user-button'
import { AppSidebar } from '@/components/app-sidebar'
import { SearchInput } from '@/components/search-input'
import { UserList } from '@/components/user-list'
import { api } from '@/lib/axios'
import { Search } from 'lucide-react'
import { toast } from 'sonner'

export interface UserProfileProps {
  id: string
  name: string
  email: string
  role: string
}

export type UserSearchParams = {
  q?: string
}

interface SearchProps {
  searchParams: UserSearchParams
}

async function fetchUsers(searchParams?: UserSearchParams) {
  try {
    let url = '/users'
    
    if (searchParams) {
      const params = new URLSearchParams()
      if ('q' in searchParams) {
        params.append('q', searchParams.q as string)
      }
      const queryString = params.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Ocorreu um erro ao carregar os usuários:', error)
    toast.error('Erro ao carregar usuários')
    return []
  }
}

export default async function Dashboard({ searchParams }: SearchProps) {
  const users: UserProfileProps[] = await fetchUsers(searchParams)

  if (!users?.length) {
    return null
  }

  return (
    <div className="flex w-full">
      <div>
        <AppSidebar />
      </div>
      <div className="md:p-5 2xl:px-20">
        <div className="mt-8 gap-10 md:mt-0 flex justify-between">
          <div className='w-full'>
            <SearchInput placeholder='Buscar usuário' type='text'>
              <Search />
            </SearchInput>
          </div>
          <AddUserButton />
        </div>
        <main className="mt-4">
          <UserList users={users}/>
        </main>
      </div>
    </div>
  )
}
