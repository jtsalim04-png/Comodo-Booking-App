import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import EventCard from '../../components/EventCard';
import ScreenBackground from '../../components/ScreenBackground';
import { fetchEvents, filterUpcomingEvents } from '../../app/api/events';
import { ROUTES, showApiError } from '../../utils';
import { getDisplayName } from '../../utils/roles';
import theme from '../../utils/theme';

const UserDashboardScreen = () => {
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth);
  const token = auth?.data?.token;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = useCallback(async () => {
    try {
      const all = await fetchEvents(token);
      setEvents(filterUpcomingEvents(all, 12));
    } catch (error) {
      showApiError(error, 'Could not load events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadEvents();
    }, [loadEvents]),
  );

  const openEvent = eventId =>
    navigation.navigate(ROUTES.USER_EVENT_DETAIL, { eventId });

  const viewAllEvents = () => navigation.navigate(ROUTES.USER_EVENTS);
  const displayName = getDisplayName(auth?.data);

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome{displayName ? `, ${displayName}` : ''}
          </Text>
          <Text style={styles.subtitle}>
            Browse upcoming events and book your ticket.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Available events</Text>

        {loading ? (
          <ActivityIndicator color={theme.colors.butterscotch} size="large" />
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => String(item.id)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  loadEvents();
                }}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyBlock}>
                <Text style={styles.empty}>
                  No upcoming events yet. Please check back soon.
                </Text>
                <TouchableOpacity style={styles.viewAllBtn} onPress={viewAllEvents}>
                  <Text style={styles.viewAllText}>View all events</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              events.length > 0 ? (
                <TouchableOpacity style={styles.viewAllBtn} onPress={viewAllEvents}>
                  <Text style={styles.viewAllText}>View all events</Text>
                </TouchableOpacity>
              ) : null
            }
            renderItem={({ item }) => (
              <EventCard
                event={item}
                actionLabel="Book now"
                onPress={() => openEvent(item.id)}
              />
            )}
          />
        )}
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fontSize.title,
    fontWeight: '600',
    color: theme.colors.tuatara,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.body,
  },
  sectionTitle: {
    fontSize: theme.fontSize.heading,
    color: theme.colors.tuatara,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  emptyBlock: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  viewAllBtn: {
    alignSelf: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.radius.pill,
    borderWidth: 2,
    borderColor: theme.colors.butterscotch,
  },
  viewAllText: {
    color: theme.colors.butterscotch,
    fontWeight: '600',
  },
});

export default UserDashboardScreen;
