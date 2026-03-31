import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Camera, Save, Lock, AlertTriangle, Trash2,
  User, Mail, Eye, EyeOff, Edit3
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/ui/Modal';


const Settings = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Local State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Form State
    const [profileData, setProfileData] = useState({
        name: user.name,
        email: user.email,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const fileInputRef = useRef(null);


    // ================= HANDLERS =================
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image must be less than 2MB');
                return;
            }
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        setProfileData({ name: user.name, email: user.email });
        setPhotoPreview(user?.photo || null);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);

        // Mock API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUser({ ...user, name: profileData.name, email: profileData.email, photo: photoPreview });

            toast.success('Profile updated successfully!');
            setIsEditingProfile(false);

        } catch (error) { toast.error('Failed to update profile.'); }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setIsUpdatingPassword(true);

        // Mock API call
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setTimeout(() => {
                toast.error('New passwords do not match!');
                setIsUpdatingPassword(false);
            }, 500);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Password updated successfully!');

            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            
            // Reset visibility
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);

        } catch (error) {
            toast.error('Failed to update password.');

        } finally { setIsUpdatingPassword(false); }
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);

        // Mock API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Account deleted permanently.');
            navigate('/');

        } catch (error) {
            toast.error('Failed to delete account.');
            setIsDeleting(false);
        }
    };

    return (
        <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full space-y-8 pb-20">

            {/* 1. PROFILE SECTION */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Section Header with Edit Button */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                        <p className="text-sm text-gray-500">Update your account's profile information and email address.</p>
                    </div>
                    {!isEditingProfile && (
                        <button
                            onClick={() => setIsEditingProfile(true)}
                            className="hover:cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Edit3 className="h-4 w-4" /> Modify
                        </button>
                    )}
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6">

                    {/* Photo Upload Area */}
                    <div className="flex items-center gap-6 mb-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div
                            onClick={() => isEditingProfile && fileInputRef.current.click()}
                            className={`relative group ${isEditingProfile ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            {photoPreview ? (
                                <img src={photoPreview} alt="Profile" className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md" />
                            ) : (
                                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border-4 border-white shadow-md">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}

                            {isEditingProfile && (
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                disabled={!isEditingProfile}
                                className="hover:cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Change Photo
                            </button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text" required disabled={!isEditingProfile}
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email" required disabled={!isEditingProfile}
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save / Cancel Buttons */}
                    {isEditingProfile && (
                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-50 animate-in fade-in slide-in-from-top-2">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={isUpdatingProfile}
                                className="hover:cursor-pointer px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdatingProfile}
                                className="hover:cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-70 shadow-sm"
                            >
                                <Save className="h-4 w-4" />
                                {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {/* 2. PASSWORD SECTION */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Update Password</h2>
                    <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="p-6 space-y-5">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative max-w-md">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type={showCurrentPassword ? "text" : "password"} required placeholder='••••••••••'
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative max-w-md">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type={showNewPassword ? "text" : "password"} required minLength="8" placeholder='••••••••••'
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative max-w-md">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"} required minLength="8" placeholder='••••••••••'
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Update Buttons */}
                    <div className="pt-2">
                        <button disabled={isUpdatingPassword} type="submit" className="hover:cursor-pointer bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-70">
                            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>

            {/* 3. DANGER ZONE */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-red-100 bg-red-50/30 flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                        <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
                        <p className="text-sm text-red-600/80">Permanently delete your account and all of your data.</p>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600 max-w-2xl mb-6">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                    </p>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="hover:cursor-pointer flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                    </button>
                </div>
            </div>

            {/* 4. DELETE CONFIRMATION MODAL */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmation('');
                }}
                title="Delete Account"
            >
                <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg flex gap-3 border border-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                        <p className="text-sm text-red-800">
                            <strong>Warning:</strong> This action is irreversible. All your landing pages, bookings, and client data will be permanently wiped from our servers.
                        </p>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Please type <strong>DELETE</strong> to confirm.
                        </label>
                        <input
                            type="text"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="DELETE"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4 mt-6 border-t border-gray-100">
                        <button
                            onClick={() => { setIsDeleteModalOpen(false); setDeleteConfirmation('') }}
                            disabled={isDeleting}
                            className="hover:cursor-pointer px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                            className="hover:cursor-pointer flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isDeleting ? 'Deleting...' : 'Permanently Delete'}
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default Settings;