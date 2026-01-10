// screens/note/NoteScreen.tsx
import HeaderHome from "@/components/commons/HeaderHome";
import ButtonUi from "@/components/ui/ButtonUi";
import TextUi from "@/components/ui/TextUi";
import useTheme from "@/hooks/useColor";
import { toastSuccess } from "@/lib/toast";
import { useNotes } from "@/stores/useNotes";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
}

function NoteScreen() {
  const color = useTheme();
  const router = useRouter();

  const { notes, deleteNote } = useNotes();

  // Sắp xếp notes theo ngày giảm dần
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleCreateNote = () => {
    router.push("/note/note-form")
  };

  const handleEditNote = (note: Note) => {
    router.push({
  to: "/note/note-form",
  query: {
    noteId: note.id
  }
})

  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    toastSuccess("Thành công", "Xóa ghi chú thành công");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={[styles.noteCard, { borderColor: color.border }]}
      onPress={() => handleEditNote(item)}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <TextUi style={[styles.noteDate, { color: color.textSecondary }]}>
          {formatDate(item.date)}
        </TextUi>
        <TouchableOpacity
          onPress={() => handleDeleteNote(item.id)}
          style={styles.deleteButton}
        >
          <TextUi style={[styles.deleteText, { color: color.error }]}>
            Xóa
          </TextUi>
        </TouchableOpacity>
      </View>
      
      <TextUi style={[styles.noteTitle, { color: color.text }]} numberOfLines={1}>
        {item.title}
      </TextUi>
      
      <TextUi
        style={[styles.noteContent, { color: color.textSecondary }]}
        numberOfLines={2}
      >
        {item.content}
      </TextUi>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <TextUi style={[styles.emptyText, { color: color.textSecondary }]}>
        📝 Chưa có ghi chú nào
      </TextUi>
      <TextUi style={[styles.emptySubText, { color: color.textSecondary }]}>
        Nhấn nút bên dưới để tạo ghi chú đầu tiên
      </TextUi>
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: color.bg }]}>
      <HeaderHome title="Sổ ghi"/>

      <FlatList
        data={sortedNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          sortedNotes.length === 0 && styles.listContainerEmpty,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <ButtonUi
          text="+ Tạo ghi chú mới"
          style={styles.createButton}
          onPress={handleCreateNote}
        />
      </View>
    </View>
  );
}

export default NoteScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: PADDING_PAGE,
    paddingTop: PADDING_PAGE,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  divider: {
    width: 80,
    height: 2,
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: PADDING_PAGE,
    paddingTop: 12,
    paddingBottom: 100,
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: "center",
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "600",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: PADDING_PAGE,
    paddingVertical: PADDING_PAGE,
    backgroundColor: "transparent",
  },
  createButton: {
    marginTop: 0,
  },
});