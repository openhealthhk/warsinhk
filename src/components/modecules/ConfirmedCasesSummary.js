import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { Label } from "../atoms/Text"
import { Box } from "@material-ui/core"
import styled from "styled-components"
import { mapColorForStatus } from "../../utils/colorHelper"

const SummaryBox = styled(Box)`
   {
    margin: 10px 0px;
  }
`

const ConfirmedCasesSummary = props => {
  const {
    status: { group: status },
  } = useStaticQuery(
    graphql`
      query {
        status: allWarsCase(filter: { type_en: { eq: "Confirmed" } }) {
          group(field: status) {
            totalCount
            fieldValue
          }
        }
      }
    `
  )

  const { t } = useTranslation()

  const statusOrdering = {
    deceased: 10,
    critical: 20,
    serious: 30,
    hospitalised: 40,
    discharged: 50,
  }

  return (
    <SummaryBox>
      {status
        .sort(
          (a, b) => statusOrdering[a.fieldValue] - statusOrdering[b.fieldValue]
        )
        .map(v => (
          <Label
            display="inline"
            style={{ color: mapColorForStatus(v.fieldValue).main }}
          >
            {t(`cases.status_${v.fieldValue}`)}：{v.totalCount}　
          </Label>
        ))}
    </SummaryBox>
  )
}

export default ConfirmedCasesSummary
