import { useAppContext } from '../../../AppContext.jsx';

import { pdf } from '@react-pdf/renderer';
import { MyDocument } from '../Generator/CVDocument.jsx';

import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CVPreview.module.css'

function DownloadButton({ cvData, order, bulletPoints, className }) {
  const handleDownload = async () => {
      // Generates PDF only when the download button is clicked in order to avoid expensive PDF computations
      const blob = await pdf(
        <MyDocument data={cvData} order={order} bulletPoints={bulletPoints} />
      ).toBlob();

      // Creating download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'luckyCV.pdf';
      link.click();

      // Releasing object to avoid memory leak
      URL.revokeObjectURL(url);
  };

  return (
      <button className={className} onClick={handleDownload}>
          Download PDF
      </button>
  );
}

export default function CVPreview() {
  const { cvData, order, bulletPoints } = useAppContext();

  return (
    <div className={styles.cvContainer}>
      {/* Using key as Date.now() because there is a bug in react-pdf library which causes <PDFDownloadLink /> component not to
        rerender when the item is removed in the runtime. Ref: https://github.com/diegomura/react-pdf/issues/3153#issuecomment-3124691739 
        P.S. Wrapping map function inside of render prop did not work, so this workaround had to be used as a last resort. */}
      <DownloadButton 
        key={Date.now()} 
        className={styles.pdfDownloadBtn} 
        cvData={cvData}
        order={order}
        bulletPoints={bulletPoints}
      >
        Download PDF
      </DownloadButton>

      <div className={styles.cvContentContainer}>
        <PersonalInfo />

        {order.map(item => {
          if (item.id === 'workExperience') {
            return <WorkExperience key={item.id} />
          } else if (item.id === 'skillsToolsInterests') {
            return <SkillsToolsInterests key={item.id} />
          } else {
            return <Education key={item.id} />
          }
        })}
      </div>
    </div>
  )
}