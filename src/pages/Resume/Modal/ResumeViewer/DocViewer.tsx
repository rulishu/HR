import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Overlay, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const DocViewerResume = () => {
  const {
    resume: { modalVisible }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const onClosed = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        modalVisible: false,
      }
    })
  }

  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("./【java开发工程师_上海】楚家汎 3年.pdf") }, // Local File
  ];
  return (
    <Overlay
      hasBackdrop={true}
      isOpen={modalVisible}
      onClose={() => onClosed()}
    >
      <Card noHover>
        <DocViewer
          documents={docs}
          initialActiveDocument={docs[1]}
          pluginRenderers={DocViewerRenderers}
        />
      </Card>
    </Overlay>
  )
}
export default DocViewerResume