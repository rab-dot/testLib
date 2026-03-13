import { Outlet } from 'react-router'
import { Toaster } from '@/shared/ui/Toaster'
import { Layout } from '@/shared/ui'
import { Header } from '@/widgets/header'

export const Main = () => {
  return (
    <>
      <Toaster />
      <Layout
        header={<Header />}
        /*     sidebar={
          <Sidebar
            content={(isOpen) => (
              <NavigationLinks>
                <NavLink
                  path="/"
                  isOpen={isOpen}
                  icon={<Icon as={OnboardingIcon} />}
                  render={() => (
                    <Heading size="xs" fontWeight="semibold">
                      Главная
                    </Heading>
                  )}
                />
                <NavLink
                  path="/search"
                  isOpen={isOpen}
                  icon={<Icon as={OnboardingIcon} />}
                  render={() => (
                    <Heading size="xs" fontWeight="semibold">
                      docs
                    </Heading>
                  )}
                />
              </NavigationLinks>
            )}
            footer={(isOpen, setSidebarExpanded) => (
              <div className="flex flex-col items-center gap-2">
                <UIButton
                  variant="flat"
                  isIconOnly
                  className=" hover:text-primary"
                  onClick={() => setSidebarExpanded(!isOpen)}
                >
                  {isOpen ? (
                    <Icon as={FaAngleDoubleLeft} />
                  ) : (
                    <Icon as={FaAngleDoubleRight} />
                  )}
                </UIButton>
                <Link
                  to={`/version-info#${APP_VERSION}`}
                  className="text-xs font-medium"
                >
                  v.{APP_VERSION}
                </Link>
              </div>
            )}
          />
        } */
      >
        <Outlet />
      </Layout>
    </>
  )
}
