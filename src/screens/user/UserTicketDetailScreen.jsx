import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';

import TicketPass from '../../components/TicketPass';
import ScreenBackground from '../../components/ScreenBackground';
import { fetchTicketById } from '../../app/api/tickets';
import { showApiError } from '../../utils';
import theme from '../../utils/theme';

const UserTicketDetailScreen = ({ route, navigation }) => {
  const { ticketId, ticket: initialTicket } = route.params || {};
  const token = useSelector(state => state.auth?.data?.token);
  const holderEmail = useSelector(state => state.auth?.data?.user?.email);
  const shotRef = useRef(null);

  const [ticket, setTicket] = useState(initialTicket || null);
  const [loading, setLoading] = useState(!initialTicket);
  const [downloading, setDownloading] = useState(false);

  const loadTicket = useCallback(async () => {
    if (initialTicket) {
      setTicket(initialTicket);
      setLoading(false);
      return;
    }
    try {
      const data = await fetchTicketById(token, ticketId);
      if (!data) {
        Alert.alert('Ticket not found', 'This ticket could not be loaded.');
        navigation.goBack();
        return;
      }
      setTicket(data);
    } catch (error) {
      showApiError(error, 'Could not load ticket');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [token, ticketId, initialTicket, navigation]);

  useFocusEffect(
    useCallback(() => {
      loadTicket();
    }, [loadTicket]),
  );

  const onDownload = useCallback(async () => {
    if (!shotRef.current?.capture || !ticket) {
      return;
    }
    setDownloading(true);
    try {
      const uri = await shotRef.current.capture({
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });
      await Share.share({
        url: uri,
        message: `Comodo ticket — ${ticket?.event?.title || 'Event'}`,
        title: 'Download ticket',
      });
    } catch (error) {
      Alert.alert(
        'Download failed',
        error.message || 'Could not save or share your ticket.',
      );
    } finally {
      setDownloading(false);
    }
  }, [ticket]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ticket',
      headerRight: () => (
        <TouchableOpacity
          onPress={onDownload}
          disabled={downloading || !ticket}
          style={styles.headerBtn}
          accessibilityLabel="Download ticket">
          <Text style={styles.headerBtnText}>
            {downloading ? '…' : '↓'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, downloading, ticket, onDownload]);

  if (loading) {
    return (
      <ScreenBackground overlayColor="rgba(34, 34, 33, 0.45)">
        <ActivityIndicator
          style={styles.loader}
          color={theme.colors.butterscotch}
          size="large"
        />
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground overlayColor="rgba(34, 34, 33, 0.45)">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ViewShot ref={shotRef} options={{ format: 'png', quality: 1 }}>
          <TicketPass ticket={ticket} holderEmail={holderEmail} />
        </ViewShot>
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={onDownload}
          disabled={downloading}>
          <Text style={styles.downloadBtnText}>
            {downloading ? 'Preparing…' : 'Download ticket'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  loader: { marginTop: 48 },
  scroll: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  headerBtn: {
    marginRight: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  headerBtnText: {
    color: theme.colors.butterscotch,
    fontSize: 22,
    fontWeight: '700',
  },
  downloadBtn: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.butterscotch,
    paddingVertical: 14,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  downloadBtnText: {
    color: theme.colors.timberwolf,
    fontWeight: '700',
    fontSize: theme.fontSize.button,
  },
});

export default UserTicketDetailScreen;
