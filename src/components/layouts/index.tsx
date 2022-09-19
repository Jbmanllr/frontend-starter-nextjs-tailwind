import { Container, Header, Footer, Breadcrumb } from "@components";

{/*export interface LayoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: any
  }
*/}
export default function Layouts({ children }) {
    return (
      <>
        <Container>
            <Header />
            <Breadcrumb />
            <main>{children}</main>
            <Footer />
        </Container>
        
      </>
    )
  }