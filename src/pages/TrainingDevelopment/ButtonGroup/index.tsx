import { Button } from "uiw";

const Index = () => {
  const addmodal = () => { }
  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Button
        type="primary"
        onClick={() => { addmodal() }}
      >
        添加培训公告
      </Button>
    </div>
  )
}
export default Index;