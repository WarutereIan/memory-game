import React from 'react';
import { Box, Text } from 'grommet';
import { Trophy, Star } from 'grommet-icons';
import { LeaderboardEntry as LeaderboardEntryType } from '../../types/stats';

interface LeaderboardEntryProps {
  entry: LeaderboardEntryType;
  position: number;
}

export const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  entry,
  position,
}) => {
  const getPositionColor = (pos: number) => {
    switch (pos) {
      case 1: return 'status-warning';
      case 2: return 'neutral-3';
      case 3: return 'status-ok';
      default: return 'dark-3';
    }
  };

  return (
    <Box
      direction="row"
      align="center"
      gap="medium"
      background="light-1"
      pad="small"
      round="small"
    >
      <Box
        width="xxsmall"
        height="xxsmall"
        align="center"
        justify="center"
      >
        {position <= 3 ? (
          <Trophy color={getPositionColor(position)} />
        ) : (
          <Text weight="bold" color="dark-3">{position}</Text>
        )}
      </Box>
      
      <Box flex>
        <Text weight="bold">{entry.username}</Text>
        <Box direction="row" gap="small" margin={{ top: 'xsmall' }}>
          <Text size="small" color="dark-3">
            Score: {entry.highScoreSingleplayer}
          </Text>
          <Text size="small" color="dark-3">
            Matches: {entry.totalCardMatchesSingleplayer}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};