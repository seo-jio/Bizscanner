import React, { useEffect, useState } from 'react';
import ReportSection from './ReportSection';
import SummaryText from './SummaryText';
import axios from '@/api/index';
import { useSearchState } from './SearchContext';
import {
  getLastYearDiff,
  getLastYearDiffText,
  getPrevQuaterDiff,
  getPrevQuaterDiffText,
} from '@/utils/diff';
import Bar from '@/components/Graph/BarGraph';

function ReportOpenStore() {
  const [openStoreInfo, setOpenStoreInfo] = useState([]);
  const { careaCode, jcategoryCode } = useSearchState();

  const fetchOpenStoreInfo = async () => {
    const {
      data: { quarterlyOpenStore },
    } = await axios.get(`/report/stores/open-status/${careaCode}/${jcategoryCode}`);
    setOpenStoreInfo(quarterlyOpenStore);
  };
  useEffect(() => {
    fetchOpenStoreInfo();
  }, []);
  return (
    <ReportSection title="개업 현황">
      <SummaryText>{`해당 상권에서 개업한 점포수는 전년 동분기 대비 ${getLastYearDiff(
        openStoreInfo,
      )}개 ${getLastYearDiffText(openStoreInfo)} 하였으며, 전분기 대비 ${getPrevQuaterDiff(
        openStoreInfo,
      )}개 ${getPrevQuaterDiffText(openStoreInfo)}하였습니다.`}</SummaryText>
      <div className="flex items-center justify-center">
        <div className="w-3/4">
          <Bar graphData={openStoreInfo} title="개업 현황" />
        </div>
      </div>
    </ReportSection>
  );
}

export default ReportOpenStore;
