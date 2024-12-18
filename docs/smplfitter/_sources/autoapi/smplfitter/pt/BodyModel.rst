smplfitter.pt.BodyModel
=======================

.. py:class:: smplfitter.pt.BodyModel(model_name = 'smpl', gender = 'neutral', model_root = None, num_betas = None)

   Bases: :py:obj:`torch.nn.Module`


   Represents a statistical body model of the SMPL family.

   The SMPL (Skinned Multi-Person Linear) model :footcite:`loper2015smpl` provides a way to
   represent articulated 3D human meshes through a compact shape vector (beta) and pose (body part
   rotation) parameters. This class also supports the SMPL+H :footcite:`romero2017mano`
   and SMPL-X models :footcite:`pavlakos2019smplx`, which extend SMPL with
   hands (SMPL+H) and hands and face (SMPL-X).

   :param model_name: Name of the model type. It must be one of the following:

                      - ``"smpl"`` -- The original SMPL model :footcite:`loper2015smpl`.
                      - ``"smplx"`` -- The SMPL-X model :footcite:`pavlakos2019smplx`, which includes hands                 and face keypoints.
                      - ``"smplxlh"`` -- The SMPL-X :footcite:`pavlakos2019smplx` model variant with                 "locked head", a.k.a. "removed head bun". From the official SMPL-X website:                 "Please note that the model versions with the removed head bun (locked head) have                 a retrained shape space which is different from the v1.1 release". Likely this                 should be used with SOMA/MoSh/AMASS.
                      - ``"smplh"`` -- The original SMPL+H model with a 10-dimensional shape space, which                 includes hands :footcite:`romero2017mano`. Only male and female models are                 available, neutral is not.
                      - ``"smplh16"`` -- Extended SMPL+H :footcite:`romero2017mano` model with a                 16-dimensional shape space. This one also has a gender-neutral model, unlike the                 original SMPL+H.
   :param gender: Gender of the model, which can be ``"neutral"``, ``"female"`` or ``"male"``.
   :param model_root: Path to the directory containing model files. By default,
                      ``"{DATA_ROOT}/body_models/{model_name}"`` is used, using the DATA_ROOT environment
                      variable.
   :param num_betas: Number of shape parameters (betas) to use. By default, all available betas are
                     used.


   .. py:method:: forward(pose_rotvecs = None, shape_betas = None, trans = None, kid_factor = None, rel_rotmats = None, glob_rotmats = None, return_vertices = True)

      Calculates the body model vertices, joint positions, and orientations for a batch of
      instances given the input pose, shape, and translation parameters. The rotation may be
      specified as one of three options: parent-relative rotation vectors (``pose_rotvecs``),
      parent-relative rotation matrices (``rel_rotmats``), or global rotation matrices
      (``glob_rotmats``).

      :param pose_rotvecs: Rotation vectors per joint, shaped as (batch_size, num_joints,
                           3) or flattened as (batch_size, num_joints * 3).
      :param shape_betas: Shape coefficients (betas) for the body shape, shaped as (batch_size,
                          num_betas).
      :param trans: Translation vector to apply after posing, shaped as (batch_size, 3).
      :param kid_factor: Adjustment factor for kid shapes, shaped as (batch_size, 1).
      :param rel_rotmats: Parent-relative rotation matrices per joint, shaped as
                          (batch_size, num_joints, 3, 3).
      :param glob_rotmats: Global rotation matrices per joint, shaped as (batch_size, num_joints,
                           3, 3).
      :param return_vertices: Whether to compute and return the body model vertices.
                              If only joints (and/or orientations) are needed, set this to False for efficiency.

      :returns:

                Dictionary
                    - **vertices** -- 3D body model vertices, shaped as (batch_size, num_vertices, 3),                     if ``return_vertices`` is True.
                    - **joints** -- 3D joint positions, shaped as (batch_size, num_joints, 3).
                    - **orientations** -- Global orientation matrices for each joint, shaped as                     (batch_size, num_joints, 3, 3).



   .. py:method:: single(pose_rotvecs = None, shape_betas = None, trans = None, kid_factor = None, rel_rotmats = None, glob_rotmats = None, return_vertices = True)

      Calculates the body model vertices, joint positions, and orientations for a single
      instance given the input pose, shape, and translation parameters. The rotation may be
      specified as one of three options: parent-relative rotation vectors (``pose_rotvecs``),
      parent-relative rotation matrices (``rel_rotmats``), or global rotation matrices
      (``glob_rotmats``).

      :param pose_rotvecs: Rotation vectors per joint, shaped as (num_joints, 3) or (num_joints *
                           3,).
      :param shape_betas: Shape coefficients (betas) for the body shape, shaped as (num_betas,).
      :param trans: Translation vector to apply after posing, shaped as (3,).
      :param kid_factor: Adjustment factor for kid shapes, shaped as (1,). Default is None.
      :param rel_rotmats: Parent-relative rotation matrices per joint, shaped as (num_joints, 3, 3).
      :param glob_rotmats: Global rotation matrices per joint, shaped as (num_joints, 3, 3).
      :param return_vertices: Whether to compute and return the body model vertices.
                              If only joints (and/or orientations) are needed, set this to False for efficiency.

      :returns:

                Dictionary
                    - **vertices** -- 3D body model vertices, shaped as (num_vertices, 3),                     if ``return_vertices`` is True.
                    - **joints** -- 3D joint positions, shaped as (num_joints, 3).
                    - **orientations** -- Global orientation matrices for each joint, shaped as                     (num_joints, 3, 3).



   .. py:method:: rototranslate(R, t, pose_rotvecs, shape_betas, trans, kid_factor = None, post_translate = True)

      Rotates and translates the body in parametric form.

      If ``post_translate`` is True, the translation is added after rotation by ``R``, such that

      .. math::
          M(\texttt{new_pose_rotvec}, \texttt{shape}, \texttt{new_trans}) = \texttt{R} \,
          M(\texttt{pose_rotvecs}, \texttt{shape}, \texttt{trans}) + \texttt{t},

      where :math:`M` is the body model forward function.

      If ``post_translate`` is False, the translation is subtracted before rotation by ``R``,
      such that

      .. math::
          M(\texttt{new_pose_rotvec}, \texttt{shape}, \texttt{new_trans}) = \texttt{R} \,
          (M(\texttt{pose_rotvecs}, \texttt{shape}, \texttt{trans}) - \texttt{t}).

      :param R: Rotation matrix, shaped as (3, 3).
      :param t: Translation vector, shaped as (3,).
      :param pose_rotvecs: Initial rotation vectors per joint, shaped as (num_joints * 3,).
      :param shape_betas: Shape coefficients (betas) for body shape, shaped as (num_betas,).
      :param trans: Initial translation vector, shaped as (3,).
      :param kid_factor: Optional in case of kid shapes like in AGORA. Shaped as (1,).
      :param post_translate: Flag indicating whether to apply the translation after rotation. If
                             true, ``t`` is added after rotation by ``R``; if false, ``t`` is subtracted before
                             rotation by ``R``.

      :returns:

                Tuple
                    - **new_pose_rotvec** -- Updated pose rotation vectors, shaped as (num_joints * 3,).
                    - **new_trans** -- Updated translation vector, shaped as (3,).

      .. rubric:: Notes

      Rotating a parametric representation is nontrivial because the global orientation
      (first three rotation parameters) performs the rotation around the pelvis joint
      instead of the origin of the canonical coordinate system. This method takes into
      account the offset between the pelvis joint in the shaped T-pose and the origin of
      the canonical coordinate system.



.. footbibliography::