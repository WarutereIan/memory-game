import React from 'react';
import { Box, Text, Grid } from 'grommet';
import { StatCard } from './StatCard';

interface StatsSectionProps {
  title: string;
  stats: Array<{ label: string; value: number }>;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ title, stats }) => (
  <Box>
    <Text size="medium" weight="bold" margin={{ bottom: 'small' }}>{title}</Text>
    <Grid columns={['1/2', '1/2']} gap="small">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </Grid>
  </Box>
);