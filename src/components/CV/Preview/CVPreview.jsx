import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from '../Generator/CVDocument.jsx';

import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CVPreview.module.css'

export default function CVPreview({ data, order, bulletPoints }) {
    return (
        <div className={styles.cvContainer}>
          {/* Using key as Date.now() because there is a bug in react-pdf library which causes <PDFDownloadLink /> component not to
            rerender when the item is removed in the runtime. Ref: https://github.com/diegomura/react-pdf/issues/3153#issuecomment-3124691739 
            P.S. Wrapping map function inside of render prop did not work, so this workaround had to be used as a last resort. */}
          <PDFDownloadLink 
            key={Date.now()} className={styles.pdfDownloadBtn} document={<MyDocument data={data} order={order} bulletPoints={bulletPoints}/>} fileName='luckyCV.pdf'
          >
            Download PDF
          </PDFDownloadLink>

          <div className={styles.cvContentContainer}>
            <PersonalInfo data={data.personalInfo} />

            {order.map(item => {
              if (item.id === 'workExperience') {
                return <WorkExperience key={item.id} data={data.workExperience} bulletPoints={bulletPoints} />
              } else if (item.id === 'skillsToolsInterests') {
                return <SkillsToolsInterests key={item.id} data={data.skillsToolsInterests} bulletPoints={bulletPoints} />
              } else {
                return <Education key={item.id} data={data.education} />
              }
            })}
          </div>
        </div>
    )
}