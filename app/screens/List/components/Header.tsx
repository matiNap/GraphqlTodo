import React from 'react';
import { StyleSheet, View } from 'react-native';
import metrics from '_metrics';

interface Props {
  children: React.ReactChild | React.ReactChild[];
}

export default function Header({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: metrics.statusBarHeight,
    paddingHorizontal: 30,
    paddingBottom: 5,
    width: metrics.width,
    flexDirection: 'row',
    alignItems: 'center',
    height: metrics.headerHeight,
  },
});
