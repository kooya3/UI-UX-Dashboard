import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from '@pankod/refine-mui';
import { PieChart, PropertyReferrals, TotalRevenue, PropertyCard, TopAgent  } from "../components";

const home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart />
      </Box>

    </Box>
  )
}

export default home