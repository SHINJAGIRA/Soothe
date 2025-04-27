'use client';

import { useState } from 'react';
import { Sulphur_Point } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import ThreeColumnLayout from '@/components/ThreeColumnLayout';
import TopBar from '@/components/TopBar';
import CategoryList from '@/components/CategoryList';
import CreationForm from '@/components/CreationForm';
import Preview from '@/components/Preview';
import PreviewModal from '@/components/CategoryModal';
import CategoryModal from '@/components/CategoryModal';
import TagModal from '@/components/TagModal';

const sulphurPoint = Sulphur_Point({
  weight: ['300', '400', '700'],
  variable: '--font-sulphur-point',
  subsets: ['latin'],
});

const CreatePage = () => {
  const initialCategories = [
    { id: 1, title: 'Introduction Video', icon: faVideo },
    { id: 2, title: 'Feature Showcase', icon: faImage },
    { id: 3, title: 'How It Works', icon: faFileAlt },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [title, setTitle] = useState('Introducing Artificial Intelligence (A.I) to CallWave');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState(faVideo);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(['Image', 'Video', 'File']);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
    }));
    setMediaFiles((prev) => [...prev, ...newMedia]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
    }));
    setMediaFiles((prev) => [...prev, ...newMedia]);
  };

  const handleShareClick = () => {
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setNewCategoryTitle('');
    setNewCategoryIcon(faVideo);
  };

  const handleAddCategory = () => {
    if (newCategoryTitle.trim()) {
      const newCategory = {
        id: categories.length + 1,
        title: newCategoryTitle.trim(),
        icon: newCategoryIcon,
      };
      setCategories((prev) => [...prev, newCategory]);
      setSelectedCategory(newCategory.id);
      handleCloseCategoryModal();
    }
  };

  const handleOpenTagModal = () => {
    setIsTagModalOpen(true);
  };

  const handleCloseTagModal = () => {
    setIsTagModalOpen(false);
    setNewTag('');
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags((prev) => [...prev, newTag.trim()]);
      handleCloseTagModal();
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'add-new') {
      handleOpenCategoryModal();
    } else {
      setSelectedCategory(Number(value));
    }
  };

  return (
    <div className={`${sulphurPoint.variable} min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 flex flex-col animate-fade-in`}>
      <TopBar onShareClick={handleShareClick} />
      <ThreeColumnLayout
        left={
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddCategoryClick={handleOpenCategoryModal}
          />
        }
        center={
          <CreationForm
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onMediaUpload={handleMediaUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDragging={isDragging}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            tags={tags}
            onAddTagClick={handleOpenTagModal}
          />
        }
        right={
          <Preview
            mediaFiles={mediaFiles}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
            title={title}
            description={description}
          />
        }
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreviewModal}
        mediaFiles={mediaFiles}
        currentMediaIndex={currentMediaIndex}
        setCurrentMediaIndex={setCurrentMediaIndex}
        title={title}
        description={description}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        newCategoryTitle={newCategoryTitle}
        setNewCategoryTitle={setNewCategoryTitle}
        newCategoryIcon={newCategoryIcon}
        setNewCategoryIcon={setNewCategoryIcon}
        onAddCategory={handleAddCategory}
      />
      <TagModal
        isOpen={isTagModalOpen}
        onClose={handleCloseTagModal}
        newTag={newTag}
        setNewTag={setNewTag}
        onAddTag={handleAddTag}
      />
    </div>
  );
};

export default CreatePage;