import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocViewerResume = () => {
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("./【java开发工程师_上海】楚家汎 3年.pdf") }, // Local File
  ];
  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
    />
  )
}
export default DocViewerResume