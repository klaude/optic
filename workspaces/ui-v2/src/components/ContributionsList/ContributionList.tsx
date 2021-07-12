import React, { FC } from 'react';

import { IShapeRenderer } from '<src>/components';

type Contribution = {
  id: string;
  contributionKey: string;
  value: string;
  endpointId: string;
  depth: number;
  shapes: IShapeRenderer[];
  name: string;
};

type ContributionsListProps = {
  contributions: Contribution[];
  renderContribution: (contribution: Contribution) => React.ReactElement;
};

export const ContributionsList: FC<ContributionsListProps> = ({
  contributions,
  renderContribution,
}) => {
  return <>{contributions.map(renderContribution)}</>;
};