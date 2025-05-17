import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSpaceContext } from "../context/SpaceContext";
import { useTaskContext } from "../context/TaskContext";
import { spaceListStyles as styles } from '../styles/components';
import { RootStackParamList, Space } from '../utils/types';
import ProgressBar from "./ProgressBar";

type SpaceListProps = {
  onAddNew?: () => void;
};

const SpaceList = ({ onAddNew }: SpaceListProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { spaces, setSelectedSpace } = useSpaceContext();
  const { allTasks } = useTaskContext();

  const getSpaceCompletion = (spaceId: string) => {
    const spaceTasks = allTasks.filter(task => task.spaceId === spaceId);
    const total = spaceTasks.length;
    const completed = spaceTasks.filter(task => task.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  const renderSpaceContent = (item: Space, completion: ReturnType<typeof getSpaceCompletion>) => {
    const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
      <View style={styles.contentOverlay}>
        <Text style={styles.spaceText}>{item.name}</Text>
        <View style={styles.progressSummary}>
          <Text style={styles.progressText}>
            {completion.completed}/{completion.total} tasks completed
          </Text>
        </View>
        <ProgressBar 
          percentage={completion.percentage}
          height={8}
          fillColor="#3c096c"
          backgroundColor="rgba(240, 208, 255, 0.7)"
          style={styles.progressBar}
        />
        {children}
      </View>
    );

    if (item.imageUri) {
      return (
        <ImageBackground
          source={{ uri: item.imageUri }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <ContentWrapper>{null}</ContentWrapper>
        </ImageBackground>
      );
    }

    return (
      <View style={[styles.backgroundImage, styles.defaultBackground]}>
        <ContentWrapper>{null}</ContentWrapper>
      </View>
    );
  };

  return (
    <FlatList
      data={spaces}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const completion = getSpaceCompletion(item.id);
        
        return (
          <TouchableOpacity
            style={styles.spaceButton}
            onPress={() => {
              setSelectedSpace(item);
              navigation.navigate("Space");
            }}
          >
            {renderSpaceContent(item, completion)}
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No spaces added yet. Create your first space!</Text>
          {onAddNew && (
            <TouchableOpacity 
              style={styles.emptyAddButton}
              onPress={onAddNew}
            >
              <Text style={styles.emptyAddText}>Create Space</Text>
            </TouchableOpacity>
          )}
        </View>
      }
    />
  );
};

export default SpaceList;